import "./Loading.css"

const Loading = () => {
    return <div className="loading__wrapper">
        <div className="loading__loading-bars">
            <div 
                className="loading__loading-bar loading__loading-bar--1"
            ></div>
            <div 
                className="loading__loading-bar loading__loading-bar--2"
            ></div>
            <div 
                className="loading__loading-bar loading__loading-bar--3"
            ></div>
            <div 
                className="loading__loading-bar loading__loading-bar--4"
            ></div>
            <div 
                className="loading__loading-bar loading__loading-bar--5"
            ></div>
            <div 
                className="loading__loading-bar loading__loading-bar--6"
            ></div>
        </div>
        <h1 className="loading__title">
            Loading...
        </h1>
    </div>
}

export default Loading
