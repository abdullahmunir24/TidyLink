import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Selection from "./Views/Selection";
import RegistrationView from "./Views/RegistrationView";
import LoginView from "./Views/LoginView";
import Account from "./Views/Account";
import AdditionalInfoEmployee from "./Views/AdditionalInfoEmployee";
import AdditionalInfoCustomer from "./Views/AdditionalInfoCustomer";
import Chat from "./Views/Chat";
import CustomerProfiles from "./Views/CustomerProfiles";
import CustomerAccount from "./Views/CustomerAccount";
import CleanerProfiles from "./Views/CleanerProfiles";
import CleanerAccount from "./Views/CleanerAcoount";
import ChatList from "./Views/ChatList";
import CustomerFavourites from "./Views/CustomerFavourites";
import CleanerFavourites from "./Views/CleanerFavourites";
const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const checkLoginStatus = () => {
      onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user);
      });
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Messages" component={ChatList} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Customer Account" component={CustomerAccount} />
            <Stack.Screen name="Select" component={Selection} />
            <Stack.Screen name="Cleaner Profiles" component={CleanerProfiles} />
            <Stack.Screen
              name="Customer Profiles"
              component={CustomerProfiles}
            />
            <Stack.Screen name="Cleaner Account" component={CleanerAccount} />
            <Stack.Screen
              name="AdditionalCustomer"
              component={AdditionalInfoCustomer}
            />
            <Stack.Screen
              name="AdditionalEmployer"
              component={AdditionalInfoEmployee}
            />
            <Stack.Screen
              name="CustomerFavourites"
              component={CustomerFavourites}
            />
            <Stack.Screen
              name="CleanerFavourites"
              component={CleanerFavourites}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Registration" component={RegistrationView} />
          </>
        )}
        <Stack.Screen name="NestedLogin">
          {() => (
            <NestedStackNavigator>
              <NestedStack.Screen name="Login" component={LoginView} />
            </NestedStackNavigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
