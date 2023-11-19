export default function TripInput() {
    return (
        // <div>
        //     <label htmlFor="trip">Start a trip</label>
        //     <br />
        //     <input type="text" placeholder="Tokyo 1/10 - 1/18" />
        //     <br />
        //     <button>Submit</button>
        // </div>
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Visualize Your Trip
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">Start A Trip</span>
            </h1>
            <p className="desc text-center">base24 is ...</p>
        </section>
    );
}