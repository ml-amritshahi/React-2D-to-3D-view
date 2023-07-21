const Coordinates = ({cord}) => {
    return (
        <div
        style={{ position: "absolute", top: 32, right: "28px", width: "100px" }}
      >
        <li
        style={{
            listStyle: "none",
            color: "green",
            padding: "0px",
            marginBottom: "1px",
            marginLeft: "-70px",
            textAlign: "center"
          }}>Dimensions</li>
        <ul>
          {cord.length > 1 &&
            cord.map((point, index) => (
              <li
                key={index}
                style={{
                  listStyle: "none",
                  color: "black",
                  padding: "10px",
                  marginBottom: "1px",
                  marginLeft: "-110px",
                  textAlign: "center"
                }}
              >{`(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`}</li>
            ))}
        </ul>
      </div>
    )
}


export default Coordinates;