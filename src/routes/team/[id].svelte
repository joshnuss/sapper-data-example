<script context="module">
  export async function preload(page, session) {
    const response = await this.fetch(`/team/${page.params.id}.json`)

    if (response.ok) {
      const member = await response.json()
      return {member}
    }

    this.error(response.status, await response.text())
  }
</script>

<script>
  export let member
</script>

<h1>Member: {member.name}</h1>
