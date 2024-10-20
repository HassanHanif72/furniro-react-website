import backgroundImage from "../assets/pics/scandinavian-interior-mockup-wall-decal-background 1.jpg";


function BackgroundImage(){
    return(
        <>
        <div>
        <img
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
            height: "85vh", // adjust the height to your needs
            width: "100%", // adjust the width to your needs
          }}
          src={backgroundImage}
          alt="Scandinavian interior mockup wall decal background"
        />
        <div
        className="chart"
          style={{
            position: "absolute",
            top: "60%",
            left: "75%",
            transform: "translate(-50%, -50%)",
            color: "black",
            backgroundColor: "#fff3e3",
            fontSize: "24px",
            fontWeight: "bold",
            padding: "10px",
            width: "500px",
          }}
        >
          <div className="px-8 py-4 ">
            New Arrival
            <br />
            <span style={{ color: "#B88E2F" }} className="text-4xl">
              Discover Our
              <br />
              New Collection
            </span>
            <br />
            <span className="text-sm leading-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
              sapiente laudantium culpa hic laborum.
            </span>
            <br />
            <br />
            <button
              style={{
                backgroundColor: "#B88E2F",
                color: "white",
                padding: "10px",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
        </>
    )
}

export default  BackgroundImage;
