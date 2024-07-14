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
		<div className='w-full bg-gray-400 h-12 py-2 px-4 rounded-md my-2'>
			{/* <Card> */}
			{/* 	<CardContent className=''> */}
					<ul className='flex items-center justify-between w-full'>
						<Link to='/'><li>Home</li></Link>
						<Link to='/one'><li>Implimentation One</li></Link>
						<Link to='/two'><li>Implimentation Two</li></Link>
						<Link to='/three'><li>Implimentation Three</li></Link>
					</ul>
			{/* 	</CardContent> */}
			{/* </Card>			 */}
		</div>
	)
}

export default Nav