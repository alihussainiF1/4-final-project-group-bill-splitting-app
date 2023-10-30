import React from 'react';
import './Bill.css';

const Bill = () => {
    return (
        <div className="bg-teal-200 h-screen p-4">
            <div className="flex justify-between items-center">
                {/* Adding the navigation bar button here */}
                <button className="bg-gray-500 text-white px-2 py-1 rounded">Navigation Bar</button>

                <div className="text-centerc py-4 font-bold text-2xl">
                    LA Roadtrip &gt; Chick-Fill-A
                </div>
                {/* Adding the add expense button here */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Add expense</button>
            </div>
            {/* Hard code the front-end components of what should be display on the Bill page (will be replaced by back-end data later) */}
            <div className="text-center py-2">
                <span className="bg-teal-300 px-4 py-2 rounded-full">7 people</span>
                <span className="ml-4">• Created Aug 2023</span>
            </div>
            <div className="text-center py-4">
                <span>Alice owed you $45.69</span>
            </div>
            <div className="flex justify-center space-x-4 py-4">
                <button className="bg-orange-200 px-6 py-2 rounded-full">Settle up</button>
                <button className="bg-teal-300 px-6 py-2 rounded-full">Balance</button>
                <button className="bg-gray-300 px-6 py-2 rounded-full">Total</button>
            </div>
            <div className="space-y-4 pl-4">
                <div className="flex justify-between">
                    <span>Alice</span>
                    <span className="text-teal-700">+ $11.27</span>
                </div>
                <div className="flex justify-between">
                    <span>Ben</span>
                    <span className="text-gray-700">Settled up</span>
                </div>
                <div className="flex justify-between">
                    <span>David</span>
                    <span className="text-teal-700">+ $11.27</span>
                </div>
                <div className="flex justify-between">
                    <span>James</span>
                    <span className="text-gray-700">Settled up</span>
                </div>
                <div className="flex justify-between">
                    <span>Jojo</span>
                    <span className="text-teal-700">+ $11.27</span>
                </div>
                <div className="flex justify-between">
                    <span>Zoey</span>
                    <span className="text-teal-700">Settled up</span>
                </div>
            </div>
        </div>
    );
}

export default Bill;
