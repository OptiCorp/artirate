import uuid from 'react-uuid';

function ImageCard(props) {

    const toggleClassName = (index) => {
        const getElement = "#" + index;
        document.querySelector(getElement).classList.toggle("hide");
    }

    const generateId = "i" + uuid();
    const toggleName = String(generateId.substring(0, 6));
    return (
    <>
        <div className="browse-card card bg-dark text-white"
                onMouseEnter={(e) => {
                  toggleClassName(toggleName)}}
                 onMouseLeave={e => {
                  toggleClassName(toggleName)}}>
            <img className="browse-img card-img" src={props.url} alt={props.description} />
            <div className="card-img-overlay browse-layover hide" id={toggleName}>
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text align-top">{props.prompt}</p>
            </div>
        </div>
    </>
    )
}

export default ImageCard;