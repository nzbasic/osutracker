import { PageDescriptor } from "ui"

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-blue-800 to-blue-900 w-screen h-96 text-white">
        {/* <ParticlesComponent /> */}
        <h1>osuTracker</h1>
      </div>
      
      <div className="flex flex-col w-col h-screen border border-red-500">
        <PageDescriptor name="Meta">
          Weekly trends relating to the most popular farm maps, fastest climbing players and more.
          [cool graphs go here]
        </PageDescriptor>
        <PageDescriptor name="Tracking">
          Comprehensive rank and score tracking for individual players and countries.
          Currently tracking [num players] with [num scores] scores, across [num countries] countries.
        </PageDescriptor>
        <PageDescriptor name="Query">
          Advanced queries to find players, maps and scores that have certain attributes.
          [list of most popular queries for the week?]
        </PageDescriptor>
        <PageDescriptor name="API">
          Public API endpoints for community use.
        </PageDescriptor>
      </div>
    </div>
  )
}
