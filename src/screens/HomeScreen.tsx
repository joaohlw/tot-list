import {
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    Keyboard,
} from 'react-native';

import styles from '../styles/HomeStyles';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Item = {
    id: string;
    name: string;
    category: string;
    purchased: boolean;
}

const STORAGE_KEY = '@shopping_list';

export default function HomeScreen() {

    const [itemName, setItemName] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Alimento');
    const [items, setItems] = useState<Item[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>('Todos');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const categories = ['Alimento', 'Limpeza', 'Higiene', 'Bebida'];
    const filterOptions = ['Todos', 'Alimento', 'Limpeza', 'Higiene', 'Bebida'];

    useEffect(() => {
        loadItems();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            saveItems(items);
        }
    }, [items]);

    const loadItems = async () => {
        try {
            const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedItems !== null) {
                setItems(JSON.parse(storedItems));
            }
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveItems = async (itemsToSave: Item[]) => {
        try {
            const jsonValue = JSON.stringify(itemsToSave);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Erro ao salvar itens:', error);
        }
    };

    function addItem() {
        const trimmedItem = itemName.trim();

        if (!trimmedItem) {
            alert('Digite o nome do item antes de adicionar');
            return;
        }

        const newItem: Item = {
            id: Date.now().toString(),
            name: trimmedItem,
            category: selectedCategory,
            purchased: false,
        };

        setItems([newItem, ...items]);
        setItemName('');
        Keyboard.dismiss();
    }

    function renderItem({ item }: { item: Item }) {
        return (
            <View style={styles.itemCard}>
                <TouchableOpacity
                    style={styles.itemContent}
                    onPress={() => togglePurchased(item.id)}
                    activeOpacity={0.8}
                >
                    <View style={[styles.checkCircle, item.purchased && styles.checkCircleDone]}>
                        {item.purchased && <Text style={styles.checkIcon}>✓</Text>}
                    </View>

                    <View style={styles.itemInfo}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                        <Text style={[styles.itemText, item.purchased && styles.itemTextDone]}>
                            {item.name}
                        </Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        const novaLista = items.filter(i => i.id !== item.id);
                        setItems(novaLista);
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function togglePurchased(id: string) {
        const novaLista = items.map(item => 
            item.id === id ? { ...item, purchased: !item.purchased } : item
        );
        setItems(novaLista);
    }

    function clearAllItems() {
        if (items.length === 0) {
            return;
        }
        setItems([]);
    }

    const getFilteredItems = () => {
        if (filterCategory === 'Todos') {
            return items;
        }
        return items.filter(item => item.category === filterCategory);
    };

    const filteredItems = getFilteredItems();
    const totalItems = items.length;
    const purchasedItems = items.filter(item => item.purchased).length;
    const pendingItems = totalItems - purchasedItems;

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            
            <StatusBar 
                barStyle="dark-content"
                backgroundColor="#f5f7fb"
            />

            <View style={styles.header}>
                <Text style={styles.title}>Lista de Compras</Text>
                <Text style={styles.subtitle}>Organize suas compras</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do item"
                    value={itemName}
                    onChangeText={setItemName}
                    onSubmitEditing={addItem}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.8}
                    onPress={addItem}
                >
                    <Text style={styles.addButtonText}>
                        Adicionar
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.categorySection}>
                <Text style={styles.sectionTitle}>Categoria do item:</Text>
                <View style={styles.categoryList}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.categoryButtonActive
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={[
                                styles.categoryButtonText,
                                selectedCategory === category && styles.categoryButtonTextActive
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Filtrar por categoria:</Text>
                <View style={styles.filterList}>
                    {filterOptions.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterButton,
                                filterCategory === filter && styles.filterButtonActive
                            ]}
                            onPress={() => setFilterCategory(filter)}
                        >
                            <Text style={[
                                styles.filterButtonText,
                                filterCategory === filter && styles.filterButtonTextActive
                            ]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity
                style={styles.clearButton}
                onPress={clearAllItems}
                activeOpacity={0.8}
            >
                <Text style={styles.clearButtonText}>Limpar lista completa</Text>
            </TouchableOpacity>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{totalItems}</Text>
                    <Text style={styles.summarylabel}>Total</Text>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{pendingItems}</Text>
                    <Text style={styles.summarylabel}>Pendentes</Text>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{purchasedItems}</Text>
                    <Text style={styles.summarylabel}>Comprados</Text>
                </View>
            </View>

            {filterCategory !== 'Todos' && filteredItems.length > 0 && (
                <View style={styles.filterIndicator}>
                    <Text style={styles.filterIndicatorText}>
                        Mostrando apenas itens de: {filterCategory} ({filteredItems.length} itens)
                    </Text>
                </View>
            )}

            <FlatList
                data={filteredItems}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>
                            {filterCategory !== 'Todos' 
                                ? `Nenhum item da categoria ${filterCategory}`
                                : 'Nenhum item cadastrado'}
                        </Text>
                        <Text style={styles.emptyText}>
                            {filterCategory !== 'Todos' 
                                ? 'Tente outra categoria ou adicione novos itens'
                                : 'Adicione seu primeiro item'}
                        </Text>
                    </View>
                }
            />
        </View>
    );
}