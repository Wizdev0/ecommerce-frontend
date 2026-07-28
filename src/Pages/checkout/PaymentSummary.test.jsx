import { it, expect, describe, vi, beforeEach } from 'vitest';
import { PaymentSummary } from './PaymentSummary';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, useLocation } from 'react-router';

vi.mock('axios');

describe('PaymentSummary component', () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 3,
            "productCostCents": 4275,
            "shippingCostCents": 499,
            "totalCostBeforeTaxCents": 4774,
            "taxCents": 477,
            "totalCostCents": 5251
        }

        loadCart = vi.fn();
        user = userEvent.setup();

    });

    it('check the dollar amount', async () => {

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        );

        expect(
            screen.getByText('Items (3):')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-production-cost'))
            .getByText('$42.75')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-shippping-cost'))
            .getByText('$4.99')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-cost-before-tax'))
            .getByText('$47.74')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-tax'))
            .getByText('$4.77')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-total-cost'))
            .getByText('$52.51')
        ).toBeInTheDocument();

        expect(screen.getByTestId('payment-summary-production-cost')).toHaveTextContent('$42.75');
        expect(screen.getByTestId('payment-summary-shippping-cost')).toHaveTextContent('$4.99');
        expect(screen.getByTestId('payment-summary-cost-before-tax')).toHaveTextContent('$47.74');
        expect(screen.getByTestId('payment-summary-tax')).toHaveTextContent('$4.77');
        expect(screen.getByTestId('payment-summary-total-cost')).toHaveTextContent('$52.51');
    });

    it('to place an order', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>
        }


        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        );

        const placeAnOrder = screen.getByTestId('place-order-button');
        await user.click(placeAnOrder);

        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');

    });
});
