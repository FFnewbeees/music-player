import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      width:'100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      flexDirection:"row",
      justifyContent:"space-between"
    },

    songInfoContainer:{
      padding:10,
      width: 200,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
    },

    artwork:{
      width: 80,
      height: 80,
      marginRight:20
    },

    songName:{
      fontWeight:'bold',
      fontSize:20
    },

    selected:{
      backgroundColor:"#8EE3F5"
    }

  });