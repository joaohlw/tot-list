import {
    SafeAreaView,
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

type Task = {
    id: string;
    title: string;
    done: boolean;
}

const STORAGE_KEY = '@todo_list_tasks';

export default function HomeScreen() {

    const [taskText, setTaskText] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            saveTasks(tasks);
        }
    }, [tasks]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedTasks !== null) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as tarefas salvas');
        } finally {
            setIsLoading(false);
        }
    };

    const saveTasks = async (tasksToSave: Task[]) => {
        try {
            const jsonValue = JSON.stringify(tasksToSave);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
            Alert.alert('Erro', 'Não foi possível salvar as tarefas');
        }
    };

    function addTask(){
        const trimmedTask = taskText.trim();

        if(!trimmedTask){
            alert('Digite uma tarefa antes de adicionar');
            return;
        }

        const newTask: Task = {
            id: String(Date.now()),
            title: trimmedTask,
            done: false,
        };

        setTasks((currentTasks) => [newTask, ...currentTasks]);

        setTaskText('');
        Keyboard.dismiss();
    }

    function renderItem({item}: {item: Task}){
        return (
            <View style={styles.taskCard}>
                <TouchableOpacity
                    style={styles.taskContent}
                    onPress={() => toggleTaskDone(item.id)}
                    activeOpacity={0.8}
                >
                    <View style={[styles.checkCircle, item.done && styles.checkCircleDone]}>
                        {item.done && <Text style={styles.checkIcon}>✓</Text>}
                    </View>

                    <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
                        {item.title}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTask(item.id)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        );

    }

    function toggleTaskDone(id: string){
        setTasks((currentTasks) => 
            currentTasks.map((task) =>
                task.id === id ? {...task, done: !task.done} : task
            )
        );
    }

    function deleteTask(id: string){
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );
    }

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Carregando tarefas...</Text>
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
                <Text style={styles.title}>To-do List</Text>
                <Text style={styles.subtitle}>Organizador de tarefas</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite uma tarefa"
                    value={taskText}
                    onChangeText={setTaskText}
                    onSubmitEditing={addTask}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.8}
                    onPress={addTask}
                >
                    <Text style={styles.addButtonText}>
                        Adicionar
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.summaryContainer}>
                
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{tasks.length}</Text>
                    <Text style={styles.summarylabel}>Total</Text>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{tasks.filter((task) => !task.done).length}</Text>
                    <Text style={styles.summarylabel}>Pendentes</Text>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{tasks.filter((task) => task.done).length}</Text>
                    <Text style={styles.summarylabel}>Concluídas</Text>
                </View>
                
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Nenhuma tarefa cadastrada</Text>
                        <Text style={styles.emptyText}>Adicione sua primeira tarefa</Text>
                    </View>
                }
            />
        </View>
    );
}