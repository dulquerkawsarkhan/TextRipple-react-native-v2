import axios from 'axios';

export const authAxios = axios.create({
  // baseURL: `http://orbitplug.com.swadexpress.com/shop`,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('@user_token')}`
  // }
});



export const formatCash = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};
export const formatLevel = (n: number) => {
  if (2000 >= n) {
    return 1
  } else if (4000 >= n) {
    return 2
  }
  else {
    return 0
  }

};

