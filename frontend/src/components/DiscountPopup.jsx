export default function DiscountPopup({ discount }) {
return (
<div className="fixed bottom-6 right-6 bg-black text-white p-5 rounded-2xl shadow-2xl">
🎉 Special Offer: Get {discount}% OFF if you checkout now!
</div>
);
}