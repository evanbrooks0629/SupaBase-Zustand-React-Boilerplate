import { create } from 'zustand';
import { supabase } from '../data/supabaseClient';


// const handleSignIn = async (email, password) => {

//     try {
//         //setLoading(true)
//         const { error } = await supabase.auth.signInWithPassword({ email: email, password: password });
//         if (error) throw error;
//         //setSignInMessageText('Signing you in...');
//         //alert('Check your email for the login link!')
//     } catch (error) {
//         //alert(error.error_description || error.message)
//     } finally {
//         //setLoading(false)
//     }
// }

// const handleSignUp = async (firstName, lastName, username, email, password) => {
//     try {
//       //setLoading(true)
//       const { error } = await supabase.auth.signUp({ email: email, password: password,
//       options: {
//         data: {
//             first_name: firstName,
//             last_name: lastName,
//             username: username,
//             email: email
//         },
//       }});
//       if (error) throw error;
//       console.log("E1: " , error);
//       //setSignUpMessageText('Check your email to complete your sign up.');
//       //alert('Check your email for the login link!')
//     } catch (error) {
//         console.log("E2: ", error);
//       //alert(error.error_description || error.message)
//     } finally {
//       //setLoading(false)
//       console.log("done");
//     }
//   }

const useStore = create((set, get) => ({
    // variables
    logInEmail: "",
    logInPassword: "",
    signUpFirstName: "",
    signUpLastName: "",
    signUpUsername: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpMessage: "",
    logInEmailErrorMessage: "",
    logInPasswordErrorMessage: "",
    signUpFirstNameErrorMessage: "",
    signUpLastNameErrorMessage: "",
    signUpUsernameErrorMessage: "",
    signUpEmailErrorMessage: "",
    signUpPasswordErrorMessage: "",
    logInError: "-",
    signUpError: "-",
    // functions
    setLogInEmailErrorMessage: (errorMessage) => set(() => ({
        logInEmailErrorMessage: errorMessage
    })),
    setLogInPasswordErrorMessage: (errorMessage) => set(() => ({
        logInPasswordErrorMessage: errorMessage
    })),
    setSignUpFirstNameErrorMessage: (errorMessage) => set(() => ({
        signUpFirstNameErrorMessage: errorMessage
    })),
    setSignUpLastNameErrorMessage: (errorMessage) => set(() => ({
        signUpLastNameErrorMessage: errorMessage
    })),
    setSignUpUsernameErrorMessage: (errorMessage) => set(() => ({
        signUpUsernameErrorMessage: errorMessage
    })),
    setSignUpEmailErrorMessage: (errorMessage) => set(() => ({
        signUpEmailErrorMessage: errorMessage
    })),
    setSignUpPasswordErrorMessage: (errorMessage) => set(() => ({
        signUpPasswordErrorMessage: errorMessage
    })),

    // log in
    setLogInEmail: (email) => set(() => ({
        logInEmail: email
    })),
    setLogInPassword: (password) => set(() => ({
        logInPassword: password
    })),
    setLogInError: (errorMessage) => set(() => ({
        logInError: errorMessage
    })),
    handleSignIn: async (email, password) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email: email, password: password });
            if (error) throw error;
        } catch (error) {
            console.log(error.error_description || error.message);
            get().setLogInError("Invalid email or password.");
        } finally {}
    },
    logIn: (email, password) => {
        get().setLogInEmail(email);
        get().setLogInPassword(password);
        get().handleSignIn(email, password);
    },

    // sign up
    setSignUpFirstName: (firstName) => set(() => ({
        signUpFirstName: firstName
    })),
    setSignUpLastName: (lastName) => set(() => ({
        signUpLastName: lastName
    })),
    setSignUpUsername: (username) => set(() => ({
        signUpUsername: username
    })),
    setSignUpEmail: (email) => set(() => ({
        signUpEmail: email
    })),
    setSignUpPassword: (password) => set(() => ({
        signUpPassword: password
    })),
    setSignUpError: (errorMessage) => set(() => ({
        signUpError: errorMessage
    })),
    setSignUpMessage: (message) => set(() => ({
        signUpMessage: message
    })),
    handleSignUp: async (firstName, lastName, username, email, password) => {
        try {
            const { error } = await supabase.auth.signUp({ email: email, password: password,
            options: {
              data: {
                  first_name: firstName,
                  last_name: lastName,
                  username: username,
                  email: email
              },
            }});
            if (error) throw error;
          } catch (error) {
            get().setSignUpError(error.error_description || error.message);
          } finally {}
    },
    signUp: (firstName, lastName, username, email, password) => {
        get().setSignUpFirstName(firstName);
        get().setSignUpLastName(lastName);
        get().setSignUpUsername(username);
        get().setSignUpEmail(email);
        get().setSignUpPassword(password);
        get().setSignUpMessage("Check your email to complete your sign up!");
        get().handleSignUp(firstName, lastName, username, email, password);
    }
}));

export default useStore;