import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      
<nav class="bg-indigo-600 dark:indigo-500">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center justify-end">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
               
                <li>
               <Link to='/'  class="text-gray-900 dark:text-white hover:underline"  >Login</Link>
               </li>
                
                <li>
                   <Link to='/register' class="text-gray-900 dark:text-white hover:underline" >Register</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>
 
    </div>
  );
};

export default Navbar;
