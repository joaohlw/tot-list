import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f7fb'
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 12,
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1f2937',
    },

    subtitle:{
        marginTop: 6,
        fontSize: 18,
        color: '#6b7280'
    },

    inputContainer:{
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },

    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#dbe2ea',
    },

    addButton:{
        backgroundColor: '#2563eb',
        borderRadius: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addButtonText:{
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },

    categorySection: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },

    filterSection: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        marginTop: 4,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },

    categoryList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#e5e7eb',
    },

    categoryButtonActive: {
        backgroundColor: '#2563eb',
    },

    categoryButtonText: {
        fontSize: 14,
        color: '#374151',
    },

    categoryButtonTextActive: {
        color: '#fff',
    },

    filterList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#e5e7eb',
    },

    filterButtonActive: {
        backgroundColor: '#10b981',
    },

    filterButtonText: {
        fontSize: 14,
        color: '#374151',
    },

    filterButtonTextActive: {
        color: '#fff',
        fontWeight: '600',
    },

    filterIndicator: {
        flexDirection: 'row',
        backgroundColor: '#dbeafe',
        marginHorizontal: 20,
        marginVertical: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },

    filterIndicatorText: {
        fontSize: 12,
        color: '#1e40af',
    },

    filterCount: {
        fontSize: 12,
        color: '#1e40af',
        fontWeight: 'bold',
    },

    clearButton: {
        backgroundColor: '#ef4444',
        marginHorizontal: 20,
        marginTop: 8,
        marginBottom: 8,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
    },

    clearButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    summaryContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap: 12,
    },

    summaryCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb'
    },

    summaryNumber: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },

    summarylabel: {
        marginTop: 4,
        fontSize: 13,
        color: '#6b7280',
    },

    emptyState:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
    },

    emptyTitle:{
        fontSize: 18,
        fontWeight: '600',
        color: '#374151'
    },

    emptyText: {
        marginTop: 8,
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center'
    },

    listContent:{
        padding: 20,
        paddingBottom: 40,
        flexGrow: 1,
    },

    itemCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb'
    },

    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#9ca3af',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkCircleDone: {
        backgroundColor: '#16a34a',
        borderColor: '#16a34a',
    },

    checkIcon: {
        color: '#fff',
        fontWeight: '700',
    },

    itemInfo: {
        flex: 1,
    },

    categoryText: {
        fontSize: 11,
        color: '#6b7280',
        marginBottom: 2,
    },

    itemText: {
        fontSize: 16,
        color: '#111827',
    },

    itemTextDone: {
        textDecorationLine: 'line-through',
        color: '#6b7280',
    },

    deleteButton: {
        marginLeft: 12,
        backgroundColor: '#fee2e2',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },

    deleteButtonText: {
        color: '#b91c1c',
        fontSize: 13,
        fontWeight: '600',
    },
});

export default styles;