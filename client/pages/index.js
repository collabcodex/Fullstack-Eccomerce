import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(useSelector((state) => state.auth));

  useEffect(() => {
    if (!user) {
      return router.push("/auth");
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>E-commerce-app</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width , initial-scale=1.0"
        />
      </Head>
      <h1 className="text-indigo-500 font-bold text-xl">Hello , Ecommerce</h1>
    </div>
  );
};

export default Home;
