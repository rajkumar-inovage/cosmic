import React from "react";
//import token from "../../Utils/token";
import BASE_URL from "../../Utils/baseUrl";

const CheckTokenValid = () => {
  const token = '726ea82af534eb4b12e63fc1594bd2abd35f0ee2036b6bc38d57b5f769d6601f';
  const [isTokenValid, setIsTokenValid] = React.useState("");
  const fetchTokenDetails = React.useRef(async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${BASE_URL}/users/token_details`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setIsTokenValid(result)
    } catch (error) {
      console.log("error", error);
    }
  });
  React.useEffect(() => {
    fetchTokenDetails.current();
  }, []);
  //console.log(isTokenValid);
  return (
    <>
      <p>Token: {token}</p>
      <p>Token Validation:  {isTokenValid.message}</p>
    </>
    
  );
};

export default CheckTokenValid;
