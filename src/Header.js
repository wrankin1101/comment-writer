import './App.css';

function Header() {
  return (
    <div className="header">
       <header className="p-3 bg-dark text-white">
      <div className="container">
        <div
          className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          {/*<!-- put this in about page
<a href="https://icons8.com/icon/99040/machine-learning">Machine Learning icon by Icons8</a>
  -->*/}

          <h4
            className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
          >
            <img
              alt="writer-logo"
              src="https://img.icons8.com/material-outlined/24/ffffff/machine-learning.png"
            />
            &nbsp;
            Student Comment Writer
          </h4>

        {/*<!--ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
</ul>-->*/}

          <div className="text-end">
            {/*<!--button type="button" className="btn btn-outline-light me-2">Share</button-->
            <!--button type="button" className="btn btn-warning">Donate</button-->*/}
          </div>
        </div>
      </div>
    </header>
    </div>
  );
}

export default Header;
