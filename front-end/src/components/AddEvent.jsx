import React, { useEffect, useState } from "react";
import axios from "axios";
import addMemberButton from "../images/addMember.png"; 
import { jwtDecode } from 'jwt-decode';

function AddEvent({addEvent, onClose}){
    const[friendsList, setfriendsList] = useState([])
    const[selectedFriends, setselectedFriends] = useState(false)
    const[searchQuery, setSearchQuery] = useState('');
    const[searchPerformed, setSearchPerformed] = useState(false);
    const[selectedMember, setselectedMember] = useState([])
    const[loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const[errors, setErrors] = useState({
        eventName: false,
        Date: false,
        Description: false,
        Members: false 
    });
    const[eventData, seteventData] = useState({
        eventName: '',
        Date: '',
        Description: '',
        Members: [],   
    })

    const backupData_friends = [{
        "id":"507f1f77bcf86cd799439011",
        "username":"Gaby Coupar",
        "avatar":"https://robohash.org/temporererumomnis.png?size=50x50\u0026set=set1",
        "phone":"435-715-2899",
        "email":"gcoupar0@rakuten.co.jp"
      }, {
        "id": "507f1f77bcf86cd799439012",
        "username": "Andy Gaber",
        "avatar": "https://robohash.org/quaeetcorrupti.png?size=50x50&set=set1",
        "phone":"425-712-2309",
        "email":"gmember0@rakuten.co.jp"
      }]
    
    const handleInputChange =(e) =>{
        const{name, value} = e.target;
        seteventData(prev => ({...prev,[name]:value}))
    }

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validate Event Name
        if (!eventData.eventName) {
            newErrors.eventName = true;
            isValid = false;
        }

        // Validate Date
        if (!eventData.Date) {
            newErrors.Date = true;
            isValid = false;
        }

        // Validate Description
        if (!eventData.Description) {
            newErrors.Description = true;
            isValid = false;
        }
        if (selectedMember.length === 0) {
            alert('Please select at least one member.'); 
            newErrors.Members = true;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleAddEvent = async () => {
        if (!validateForm()) {
            return; // Stop the function if validation fails
        }

        const submitData = {
            eventName: eventData.eventName,
            Date: eventData.Date,
            Description: eventData.Description,
            Members: selectedMember
        };
    
        try {
            console.log('Submitting data:', submitData);
            const response = await axios.post(`http://localhost:3001/addEvent`, submitData);
            console.log(`Event added:`, response.data);
            onClose(); // Optionally close the form upon successful submission
        } catch (error) {
            console.error('Failed to submit event:', error.response);
        }
    }

    //fetch friends' data for the member list
    async function friendsCL(userID){
        setLoading(true);
        setSearchPerformed(true);
        console.log('userID in friendsCL:', userID, 'Type:', typeof userID);
        try{
            //const url = `http://localhost:3001/addEventMember/friendsList/${currentUser.id}`;

            // Make the API call
            const response = await axios.get(`http://localhost:3001/addEventMember/friendsList/${userID}`);
            //return the data
            console.log(response)
            setfriendsList(Array.isArray(response.data.friends) ? response.data.friends : [response.data.friends]);
            //setfriendsList(response.data.flatMap(user => user.friends));

        }catch(error){
            console.error("There was an error fetching the data:", error.response);
            setfriendsList(backupData_friends)
        }
        finally{
            setLoading(false);
        }
    }

/*
    useEffect(() => {
        // Retrieve the current user from local storage
        const token = localStorage.getItem("token");
        const decodedUser = jwtDecode(token);
        if (decodedUser && decodedUser.id) {
            console.log(decodedUser.id)
            setselectedMember(prevMembers => {
                // Check if the current user's ID is already in the selected members
                if (prevMembers.some(member => member.id === decodedUser.id)) {
                    return prevMembers;
                }
                // Add the current user's ID to the selected members
                return [...prevMembers, decodedUser.id];
            });
        } else {
            console.error("No valid user found in local storage.");
        }
    }, []);
    */

    /*
    useEffect(() => {
        console.log('Selected Members:', selectedMember);
    }, [selectedMember]);
    */

    const handleSearch = () => {
        const token = localStorage.getItem("token");
        const decodedUser = jwtDecode(token);
        if (decodedUser && decodedUser.id) {
            console.log(decodedUser.id)
            setCurrentUser(decodedUser.id)
            friendsCL(decodedUser.id)
            setselectedMember(prevMembers => {
                // Check if the current user's ID is already in the selected members
                if (prevMembers.some(member => member.id === decodedUser.id)) {
                    return prevMembers;
                }
                // Add the current user's ID to the selected members
                return [...prevMembers, decodedUser.id];
            });
        } else {
            console.error("No valid user found in local storage.");
        }
    };
    
   
    const handleSearchChange = (e) =>{
        setSearchQuery(e.target.value)
    }

    const filteredFriends = searchQuery ? friendsList.filter(friend => friend?.username?.toLowerCase().includes(searchQuery.toLowerCase())) : [];

    const handleSelectedMember = (memberId) =>{
        if(selectedMember.includes(memberId)){
            return;
        }
        const member = friendsList.find(p => p._id === memberId)
        if(member){
            setselectedMember([...selectedMember, memberId]);
            console.log(`Member Successfuly Added!`)
        }
        
    }

    useEffect(()=>{
        seteventData(prev => ({
            ...prev,
            Members:selectedMember
        }));
    },[selectedMember])

    return(
        <div className="add-event">
            <div className="add-event-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={(e) => {e.preventDefault();handleAddEvent();}}>
                    <div className="EventName">
                        <input 
                            type="text" 
                            placeholder="Event Name" 
                            className={`mt-4 block w-full rounded-md px-3 py-2 ${errors.eventName ? 'bg-red-100 border-red-500' : 'bg-white border-gray-300'}`}
                            name = "eventName"
                            value={eventData.eventName}
                            onChange={handleInputChange}
                        />
                        {errors.eventName && <p className="text-red-500 text-sm mt-1 error-message">Event Name is required.</p>}
                    </div>
                    <div className="EventDate">
                        <input 
                            type="date" 
                            placeholder="Event Date"
                            className={`mt-4 block w-full rounded-md px-3 py-2 ${errors.Date ? 'bg-red-100 border-red-500' : 'bg-white border-gray-300'}`}
                            name = "Date"
                            onChange={handleInputChange}
                            value={eventData.Date}
                        />
                        {errors.Date && <p className="text-red-500 text-sm mt-1 error-message">Event Date is required.</p>}
                    </div>
                    <div className="EventDescription">
                        <input 
                            type="text" 
                            placeholder="Event Description"
                            className={`mt-4 block w-full rounded-md px-3 py-2 ${errors.Description ? 'bg-red-100 border-red-500' : 'bg-white border-gray-300'}`}
                            name = "Description"
                            onChange={handleInputChange}
                            value={eventData.Description}
                        />
                        {errors.Description && <p className="text-red-500 text-sm mt-1 error-message">Event Description is required.</p>}
                    </div>
                   
                
                
                <button type = 'button' className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => {
                    setselectedFriends(true)
                }}
                >
                    Select Members
                </button>
                {selectedFriends && (
                    <div className="select-members-popup">
                        <div className="select-members-content">
                            <span className="close" onClick={() => setselectedFriends(false)}>&times;</span>
                            <input 
                                type="text" 
                                placeholder="Member's Name" 
                                className="member-name" 
                                onChange={handleSearchChange}    
                            />
                            <button type='button'onClick={handleSearch}>Search</button>
                            {loading ? (<p>Loading...</p>
                            ) : searchPerformed ? (  
                                filteredFriends.length>0?(
                                filteredFriends.map(friend =>(
                                    <div className="flex items-center justify-between p-2 friend" key={friend._id}>
                                        <img src={friend.avatar}></img>
                                        <span>{friend.username}</span>
                                        {!selectedMember.includes(friend._id) && (
                                            <img
                                                src={addMemberButton}
                                                alt="Add Member"
                                                className="add-Member-Button"
                                                onClick={() => handleSelectedMember(friend._id)}
                                                style={{ width: "40px", height: "40px" }}
                                            />
                                        )}
                                    </div>
                                ))
                            ) : searchPerformed?(
                                <p>No Friend Found</p>
                            ): null
                            ): null
                            }
                        </div>
                        <button onClick={() => setselectedFriends(false)}>done</button>
                    </div>
                )}

                    <div className="formBtn">
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEvent;