import Link from "next/link";


export default function Home() {
  return(
          <div className="m-5 p-5">
              <h1>Logowanie</h1>
              <Link href={'/dashboard'} className="text-violet-500">Dashboard</Link>
          </div>
  )
}
