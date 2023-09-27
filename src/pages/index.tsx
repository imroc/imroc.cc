import React from 'react'
import Layout from '@theme/Layout'
import HomepageHero from './_components/HomepageHero'
import HomepageBlog from './_components/HomepageBlog'
import HomepageProject from './_components/HomepageProject'

function Home() {
  return (
    <Layout description="roc">
      <HomepageHero></HomepageHero>
      <main className="container-wrapper">
        <HomepageBlog />
        <HomepageProject />
      </main>
    </Layout>
  )
}

export default Home

