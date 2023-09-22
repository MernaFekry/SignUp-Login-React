import React,{useState,useEffect} from 'react';
import person from '../../Assets/person.png';
import password from '../../Assets/password.png';
import email from '../../Assets/email.png';
import './SignUpLogin.css';
import axios from 'axios';

const SignUpLogin = () => {
    const [action, setAction] = useState("Sign Up");
    const [usersData, setUsersData] = useState([{}]);

    const [enteredData, setEnteredData] = useState({
        first_name:'',
        email:'',
        password:''
    });


    async function getUsersData(){
        const response = await axios.get("http://localhost:3030/users")
                                    .then((res) => {
                                        setUsersData(res.data);
                                    })

                                    
    }

    async function handleSubmit(){
        const {data} = await axios.post("http://localhost:3030/users" , enteredData);
        console.log( data );
    }
    

    // Get Input Values
    function getEnteredData(e){
        const inputValue = e.target.value;
        const inputId = e.target.id;

        let temp = {...enteredData};
        temp[inputId] = inputValue;
        setEnteredData(temp);

    }

    useEffect(() => {
        getUsersData();
    }, []);

    return <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">

            {action ==="Login" ? <div></div> : <div className="input">
                <img src={person} />
                <input onChange={getEnteredData} id='first_name'  type="text" placeholder='Name' />
            </div>}
            

            <div className="input">
                <img src={email} />
                <input onChange={getEnteredData} id='email' type="email" placeholder='E-mail'/>
            </div>

            <div className="input">
                <img src={password} />
                <input onChange={getEnteredData} id='password' type="password" placeholder='Password'/>
            </div>

        </div>
        {action === "Sign Up" ? <div></div> :<div className="forgot-password">Forgot Your Password<span>Click Here!</span></div>
        }
        
        <div className="submit-container">
            <div className={action ==="Login" ?"submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
            <div className={action ==="Sign Up" ?"submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
        </div>

        <div className='submit-Form'>
            <button onClick={handleSubmit} type='submit'>{action}</button>
        </div>
        
    </div>
}

export default SignUpLogin;
