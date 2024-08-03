import React from "react";
import LoginForm from "../../frontend/Components/H.LoginForm";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import DashBoard from "../../frontend/Components/Dashboard";



describe('LoginForm', () => {


    it('renders LoginForm component', () => {
     render(
     <BrowserRouter>
        <LoginForm />
     </BrowserRouter>
    );
    
     expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    })

    // it('load dashboard page after user successfully logs in', async () => {
    //     const user = userEvent.setup()
    //     render (
    //         <DashBoard />
    //     )
    //     await user.click(screen.getByRole('button', {name: /Log In!/i}))
    // })
  });
