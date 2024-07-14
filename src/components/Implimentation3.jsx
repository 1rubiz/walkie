import React from 'react'
import useGyroscope from 'react-hook-gyroscope'
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card"

function Implimentation3() {
	const gyroscope = useGyroscope()
	const onGyroscopeUpdate = (gyroscope) => {
	  console.log('Here’s some new data from the Gyroscope API: ', gyroscope)
	}

	const gyroscope2 = useGyroscope({}, onGyroscopeUpdate)

	const gyroscope3 = useGyroscope({
	  frequency: 60, // cycles per second
	})
	return (
		<div className='flex items-center justify-between flex-wrap'>
			<Card>
				<CardHeader><div>Test one</div></CardHeader>
				<CardContent>
						<div>
						Data: {
								!gyroscope.error ? (
								    <ul>
								      <li>X: {gyroscope.x}</li>
								      <li>Y: {gyroscope.y}</li>
								      <li>Z: {gyroscope.z}</li>
								    </ul>
								  ) : (
								    <p>No gyroscope, sorry.</p>
								  )
							}
						</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader><div>Test two</div></CardHeader>
				<CardContent>
						<div>
						Data: {
								!gyroscope2.error ? (
								    <ul>
								      <li>X: {gyroscope.x}</li>
								      <li>Y: {gyroscope.y}</li>
								      <li>Z: {gyroscope.z}</li>
								    </ul>
								  ) : (
								    <p>No gyroscope, sorry.</p>
								  )
							}
						</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader><div>Test three</div></CardHeader>
				<CardContent>
						<div>
						Data: {
								!gyroscope3.error ? (
								    <ul>
								      <li>X: {gyroscope.x}</li>
								      <li>Y: {gyroscope.y}</li>
								      <li>Z: {gyroscope.z}</li>
								    </ul>
								  ) : (
								    <p>No gyroscope, sorry.</p>
								  )
							}
						</div>
				</CardContent>
			</Card>	
		</div>
	)
}

export default Implimentation3
