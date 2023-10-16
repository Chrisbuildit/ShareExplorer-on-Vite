import React, {useContext, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/navbar/NavBar";
import SearchResults from "./pages/searchResults/SearchResults";
import Profile from "./pages/profile/Profile";
import CompanyDetails from "./pages/company-details/company-details";
import SearchPage from "./pages/searchPage/SearchPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

        return (
        // To use React-Query anywhere in the app, I first need to wrap my main component into QueryClientProvider.
        <QueryClientProvider client={queryClient}>
            <>
                <NavBar />
                <main>
                    <Routes>
                            <Route path="/" element={ <Home /> }/>
                            <Route path="/searchResults/:companyId" element={ <SearchResults /> }/>
                            <Route path="/company-details/:date" element={ <CompanyDetails /> }/>
                            <Route path="/profile" element={ <Profile /> }/>
                            <Route path="/signUp" element={ <SignUp/> }/>
                            <Route path="/signIn" element={ <SignIn/> }/>
                            <Route path="/searchPage" element={ <SearchPage/> }/>
                    </Routes>
                </main>
            </>
        </QueryClientProvider>
    )
}

export default App;
