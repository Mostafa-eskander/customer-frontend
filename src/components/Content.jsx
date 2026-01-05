import classes from './Content.module.css';

function ContentPage({title, children}) {
    return(
        <section className={classes.content}>
            <div className="container">
                <h2>{title}</h2>
                {children}
            </div>
        </section>
    )
}

export default ContentPage;