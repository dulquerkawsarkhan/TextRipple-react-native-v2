import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import AppStatusBar from "./AppStatusBar";

const Header = ({ name }: any) => {
    const navigation = useNavigation<any>()


    return (

        <>
            <AppStatusBar />
            <View
                style={{
                    height: 40,
                    flexDirection: 'row',
                    marginTop: 1,
                    alignItems: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    width: SIZES.responsiveScreenWidth(97)

                }}
            >


                <Text style={{
                    fontSize: SIZES.responsiveScreenFontSize(1.9),
                    fontWeight: '800',
                    color: COLORS.primary
                }}>
                    {name}
                </Text>


            </View>

        </>

    )

}

export default Header