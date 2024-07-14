import React from 'react'
import StepCounter from './stepCounter.jsx';
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card"

function Implimentation1() {
	return (
		<div className='h-screen'>
			<Card>
				<CardContent>
					<StepCounter/>
				</CardContent>
			</Card>			
		</div>
	)
}

export default Implimentation1