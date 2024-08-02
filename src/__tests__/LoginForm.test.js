import LoginForm from "../../frontend/Components/H.LoginForm";
import { render, screen } from '@testing-library/react';

describe('LoginForm', () => {


    it('renders LoginForm component', () => {
     render(<LoginForm />)
     expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    })

  });
