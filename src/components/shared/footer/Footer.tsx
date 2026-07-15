import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import Container from "@/components/shared/container/Container";

const Footer = () => {
  return (
    <footer className="border-t py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className="text-3xl font-bold text-primary"
            >
              Learnify
            </Link>

            <p className="mt-5 text-default-500">
              Learn modern skills from experienced instructors and grow your
              career with confidence.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <FaGithub />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link href="/">Home</Link>

              <br />

              <Link href="/courses">Courses</Link>

              <br />

              <Link href="/about">About</Link>

              <br />

              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Categories
            </h3>

            <div className="space-y-3">
              <p>Web Development</p>

              <p>UI UX Design</p>

              <p>Marketing</p>

              <p>Artificial Intelligence</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Contact
            </h3>

            <div className="space-y-3 text-default-500">
              <p>Rajshahi, Bangladesh</p>

              <p>support@learnify.com</p>

              <p>+880 1700-000000</p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t pt-8 text-center text-default-500">
          © {new Date().getFullYear()} Learnify. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;