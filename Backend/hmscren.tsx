// ✅ Home Screen with Manual Food Entry
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [user, setUser] = useState<User | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const [newItemName, setNewItemName] = useState("");
    const [newItemStartDate, setNewItemStartDate] = useState(new Date());
    const [newItemExpiryDate, setNewItemExpiryDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
    const [isAddItemModalVisible, setAddItemModalVisible] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigation.replace("Auth");
        }
      });
      return () => unsubscribe();
    }, [navigation]);
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigation.replace("Auth");
      } catch (error: any) {
        Alert.alert("Error", error.message || "Logout failed");
      }
    };
  
    const addItem = () => {
      if (!newItemName || !newItemStartDate || !newItemExpiryDate) {
        Alert.alert("Error", "All fields are required");
        return;
      }
  
      const newItem = {
        name: newItemName,
        startDate: newItemStartDate,
        expiryDate: newItemExpiryDate,
      };
  
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItemName("");
      setNewItemStartDate(new Date());
      setNewItemExpiryDate(new Date());
      setAddItemModalVisible(false);
    };
  
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.homeText}>Welcome, {user?.email}!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => setAddItemModalVisible(true)} style={styles.addItemButton}>
          <Text style={styles.addItemButtonText}>Add Food Item</Text>
        </TouchableOpacity>
  
        {/* Modal for adding new food item */}
        <Modal visible={isAddItemModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
              style={styles.input}
            />
            <Text style={styles.dateText}>Start Date:</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>Select Start Date</Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={newItemStartDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowStartDatePicker(false);
                  setNewItemStartDate(date || new Date());
                }}
              />
            )}
            <Text style={styles.dateText}>Expiry Date:</Text>
            <TouchableOpacity onPress={() => setShowExpiryDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>Select Expiry Date</Text>
            </TouchableOpacity>
            {showExpiryDatePicker && (
              <DateTimePicker
                value={newItemExpiryDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowExpiryDatePicker(false);
                  setNewItemExpiryDate(date || new Date());
                }}
              />
            )}
            <TouchableOpacity onPress={addItem} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Item</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddItemModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
  
        {/* Food Items List */}
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>Start Date: {item.startDate.toLocaleDateString()}</Text>
              <Text style={styles.itemText}>Expiry Date: {item.expiryDate.toLocaleDateString()}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  