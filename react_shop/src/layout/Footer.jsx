export function Footer(){
    return (
        <footer className="page-footer blue lighten-1">
          <div className="footer-copyright">
            <div className="container">
            © {new Date().getFullYear()} Sofiya Balchinova 
            <a className="grey-text text-lighten-4 right" href="#!">Repository</a>
            </div>
          </div>
        </footer>
    );
}