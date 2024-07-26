import React from 'react'
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card"
import { Link } from 'react-router-dom'
function Nav() {
	return (
		<div className='w-full bg-gray-400 min-h-12 py-2 px-4 rounded-md my-2 bg-slate-500'>
			{/* <Card> */}
			{/* 	<CardContent className=''> */}
					<ul className='flex flex-col gap-6 md:gap-2 md:flex-row items-center justify-between w-full'>
						<Link to='/'><li>Home</li></Link>
						{/* <Link to='/one'><li>Implimentation One</li></Link> */}
						<Link to='/two'><li>Implimentation Two</li></Link>
						{/* <Link to='/three'><li>Implimentation Three</li></Link> */}
						{/* <Link to='/four'><li>Implimentation 4</li></Link> */}
						{/* <Link to='/five'><li>Implimentation 5</li></Link> */}
						<Link to='/six'><li>Implimentation 6</li></Link>
						<Link to='/seven'><li>Implimentation 7</li></Link>
					</ul>
			{/* 	</CardContent> */}
			{/* </Card>			 */}
		</div>
	)
}

export default Nav