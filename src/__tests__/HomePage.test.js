import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../frontend/components/B.HomePage.jsx';

jest.mock('../../frontend/components/TopNavBar.jsx', () => {
    return function MockTopNavBar() {
      return (
        <nav>
          <a href="/home">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/news">News</a>
          <a href="/about-us">About Us</a>
        </nav>
      );
    };
  });


describe('HomePage Component', () => {
    // Render the HomePage component wrapped in BrowserRouter
    beforeEach(() => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
    });

    test('renders Home link', () => {
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
    });

    test('renders Dashboard link', () => {
      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toBeInTheDocument();
    });

    test('renders News link', () => {
      const newsLink = screen.getByRole('link', { name: /news/i });
      expect(newsLink).toBeInTheDocument();
    });

    test('renders About Us link', () => {
      const aboutUsLink = screen.getByRole('link', { name: /about us/i });
      expect(aboutUsLink).toBeInTheDocument();
    });
  });
