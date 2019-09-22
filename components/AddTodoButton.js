const AddTodoButton = ({ onPress }) => (
    <Fab
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: COLORS.primary }}
        position="bottomRight"
        onPress={onPress}
    >
        <Icon name="add" />
    </Fab>
  );