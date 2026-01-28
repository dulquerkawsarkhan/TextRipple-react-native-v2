
const myCards = [
    {
        id: 1,
        name: "Master Card",
        icon: require("../assets/icons/mastercard.png"),
        card_no: "1234"
    },
    {
        id: 2,
        name: "Google Pay",
        icon: require("../assets/icons/google.png"),
        card_no: "1234"
    },
]

const allCards = [
    {
        id: 1,
        name: "Apple Pay",
        icon: require("../assets/icons/apple.png")
    },
    {
        id: 2,
        name: "Visa",
        icon: require("../assets/icons/visa.png"),
    },
    {
        id: 3,
        name: "PayPal",
        icon: require("../assets/icons/paypal.png"),
    },
    {
        id: 4,
        name: "Google Pay",
        icon: require("../assets/icons/google.png"),
    },
    {
        id: 5,
        name: "Master Card",
        icon: require("../assets/icons/mastercard.png"),
    },
]

import joya_mondal from '../assets/demyUserImages/joya_mondal.jpeg'
import kawsara_khan from '../assets/demyUserImages/kawsara_khan.jpeg'
import saidur_fahman_faysal from '../assets/demyUserImages/saidur_fahman_faysal.jpeg'
import sharif_rafid_ur_rahman from '../assets/demyUserImages/sharif_rafid_ur_rahman.jpeg'
import shihab_ahemed from '../assets/demyUserImages/shihab_ahemed.jpeg'



const demyUsers = [
    {
        id: 1,
        name: "Joya Mondal",
        image: joya_mondal,
        age: 23,
        gender: "Female",
        height: "5,50''",
        weight: "63Kg",
        phone: "+8801877-031985",
        comment: "Mention what you liked, such as the quality, service, or value ",
        reviews: "90",
        time: "03:30PM",
        date: "02-02-2025",
        message:"okay, i will send you",
        update_at:"03-02-2025 6:30PM",
        email:"khan@gmail.com",
        roomJoinId:'5770654',
    },

    {
        id: 2, name: "Kawsar Khan",
        image: kawsara_khan,
        age: 26,
        gender: "Mel",
        height: "5,60''",
        weight: "65Kg",
        phone: "+8801568-393974",
        comment: "Mention what you liked, such as the quality, service, or value ",
        reviews: "88",
        time: "09:10PM",
        date: "12-06-2025",
        message:"Hi, Sir",
        update_at:"03-02-2025 6:30PM",
        email:"khan@gmail.com",
        roomJoinId:'5770654',
    },
    {
        id: 3,
        name: "Saidur Rahman Faysal",
        image: saidur_fahman_faysal,
        age: 22,
        gender: "Mel",
        height: "5,70''",
        weight: "68Kg",
        phone: "+8801785-562940",
        comment: "Mention what you liked, such as the quality, service, or value ",
        reviews: "121",
        time: "12:30AM",
        date: "25-12-2025",
        message:"Hello, Madam",
        update_at:"03-02-2025 6:30PM",
        email:"khan@gmail.com",
        roomJoinId:'5770654',
    },
    {
        id: 4,
        name: "Sharif Rafid Ur Rahman",
        image: sharif_rafid_ur_rahman,
        age: 21,
        gender: "Mel",
        height: "5,60''",
        weight: "60Kg",
        phone: "+8801944-150909",
        comment: "Mention what you liked, such as the quality, service, or value ",
        reviews: "22",
        time: "11:30PM",
        date: "02-02-2025",
        message:"okay, no problem ",
        update_at:"03-02-2025 6:30PM",
        email:"khan@gmail.com",
        roomJoinId:'5770654',
    },
    {
        id: 5,
        name: "Shihab Ahemed",
        image: shihab_ahemed,
        age: 23,
        gender: "Mel",
        height: "5,90''",
        weight: "90Kg",
        phone: "+8801770-716570",
        comment: "Mention what you liked, such as the quality, service, or value ",
        reviews: "95",
        time: "6:30PM",
        date: "03-02-2025",
        message:"okay",
        update_at:"03-02-2025 6:30PM",
        email:"khan@gmail.com",
        roomJoinId:'5770654',
    },



]


export default {
    myCards,
    allCards,
    demyUsers,
}