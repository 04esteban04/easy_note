import { Footer, Navbar } from '../';

function Home () {
    return (
        <div>
            <Navbar logout={true}/>
            
            <h1>
                You are in the Home page!
            </h1>

            <Footer />
        </div>
    )
}

export default Home;