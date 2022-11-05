import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss"
import Button from "../button/button.component";
const defaultFormFields = {
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm =()=>{

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields)

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e)=>{
    e.preventDefault()

    if(password!== confirmPassword){
        alert("passwords do not match")
        return;
    }

    try{
        const {user} = await createAuthUserWithEmailAndPassword(email,password);
       await createUserDocumentFromAuth(user, {displayName});
       resetFormFields();
        
    }catch(error){
        if(error.code==="auth/email-already-in-use"){
            alert("cannot create user, email already in use")
        }else{
            console.log(error)
        }
            
    }
    }

    const handleChange = (e)=>{
  const {name, value} = e.target;
  setFormFields({...formFields,[name]:value})
    }


    return(
<div className="sign-up-container">
    <h2>Don´t have an account?</h2>
    <span>Sign up with your email and password</span>
    <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <FormInput label="Display Name" type="text" onChange={handleChange} required name="displayName" value={displayName}/>

        <label>Email</label>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

        <label>Password</label>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

        <label>Confirm Password</label>
        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        <Button  type="submit">Sign up</Button>
    </form>
</div>
    )
}
export default SignUpForm