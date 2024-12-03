const ShippingFast = () => {
  const shippingFastData = [
    {
      img: "https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/icons/svg/8-trolley.svg",
      title: "Free shipping",
      subTitle: "On all orders over $49.00",
    },
    {
      img: "https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/icons/svg/9-money.svg",
      title: "15 days returns",
      subTitle: "Moneyback guarantee",
    },
    {
      img: "https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/icons/svg/10-credit-card.svg",
      title: "Secure checkout",
      subTitle: "Protected by Paypal",
    },
    {
      img: "https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/icons/svg/11-gift-card.svg",
      title: "Offer & gift here",
      subTitle: "On all orders over",
    },
  ];

  return (
    <div className="bg-[#F2F6F7] py-14 ">
      <div className="fixed-w grid  grid-cols-1 md:grid-cols-2 lg:flex justify-center items-center gap-14 ">
        {shippingFastData.map((item, index) => (
          <ShippingFastCard
            key={index}
            img={item.img}
            title={item.title}
            subTitle={item.subTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default ShippingFast;

const ShippingFastCard = ({ img, title, subTitle }: any) => {
  return (
    <div className="flex items-center gap-3 font-josefin ">
      <img className="size-14 object-contain" src={img} alt={title} />
      <div>
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-base text-gray-600">{subTitle}</p>
      </div>
    </div>
  );
};
