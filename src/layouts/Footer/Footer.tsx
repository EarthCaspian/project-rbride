import { Link } from "react-router-dom";
import { IconComponent } from "../../utils/icons";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div style={{ marginTop: 150 }}>
      {/* Footer - Starts */}
      <footer className="footer text-center fixed-bottom bg-light">
        <p className="mt-2 mb-0 fs-6">
          Copyright ©{" "}
          <strong className="text-secondary">RoboRide Rental Services</strong>
        </p>
        <p className="my-0 mb-1">
          <Link
            className="me-2"
            to="https://github.com/EarthCaspian/project-rbride"
            target="_blank"
          >
            <IconComponent iconName="GitHub" />
          </Link>
          <small>
            Proudly crafted by RoboRide Teams at TOBETO Java React Camp -
            Fueling future tech leaders{" "}
          </small>{" "}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
