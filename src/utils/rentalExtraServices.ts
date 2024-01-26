
export interface RentalServices {
    id: number
    header: string
    description: string
    price: number
}

export const rentalInsuranceOptions : RentalServices[] = [
    {
        id: 1,
        header : "Compact Comprehensive Repair Coverage Insurance",
        description : "This insurance option provides comprehensive coverage for repairs to the rented vehicle. It encompasses a wide range of potential damages, offering protection against various incidents that may occur during the rental period. This coverage ensures that you can drive with peace of mind, knowing that the costs associated with repairs for covered events are taken care of.",
        price: 1000,
    },
    {
        id : 2,
        header: "Intermediate Comprehensive Repair Insurance",
        description: "This insurance level goes beyond the basics, offering a comprehensive solution for repair expenses during the rental period. It provides coverage for a diverse set of potential damages, offering a balance between protection and affordability. With Intermediate Comprehensive Repair Insurance, you can enjoy your rental experience with added assurance that a variety of repair costs are covered.",
        price: 1200,
    },
    {
        id : 3,
        header: "Optimal Comprehensive Repair Insurance",
        description : "The Optimal Comprehensive Repair Insurance represents the highest level of coverage available. It extends comprehensive protection to cover a broad spectrum of potential damages to the rented vehicle. This premium insurance option ensures maximum peace of mind, minimizing your financial responsibility for covered events. Optimal Comprehensive Repair Insurance is ideal for those seeking the highest level of protection during their rental period.",
        price: 1500,
    }
];

export const rentalExtraServices : RentalServices[] = [
    {
        id: 1,
        header: "Child Seat",
        description: "A car child seat is a specially designed safety restraint system for infants and young children, ensuring their protection during car journeys. At our rental car firm, we provide the option to include a child seat with your rental, offering a secure and comfortable solution for traveling with your little ones.",
        price: 500,
    },
    {
        id: 2,
        header: "Navigation",
        description: "Navigation, in the context of our rental car services, refers to the advanced GPS (Global Positioning System) technology equipped in our vehicles. This feature assists drivers in effortlessly finding their way to destinations, providing real-time directions, and enhancing overall travel convenience during your rental period.",
        price: 600,
    },
    {
        id: 3,
        header: "Winter Tire",
        description: "Winter tires, available as an option with our rental cars, are specially designed tires crafted to provide superior traction and control in cold and snowy conditions. Engineered to enhance safety during winter travel, these tires offer improved grip on icy roads, ensuring a secure driving experience for our customers.",
        price:750,
    }
]