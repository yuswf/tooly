import IconComponent from './Icon.component';

function LoaderComponent({color}) {
    return (
        <div className="loader">
            <IconComponent icon="loader" color={color} size={32} />
        </div>
    )
}

export default LoaderComponent;
