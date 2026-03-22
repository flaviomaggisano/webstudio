// Stripe checkout handler
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function handleCheckout(req, res) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items,
            mode: 'payment',
            success_url: req.body.success_url,
            cancel_url: req.body.cancel_url,
        });
        res.status(200).json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = handleCheckout;