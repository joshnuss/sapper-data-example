<script context="module">
  export async function preload() {
    const response = await this.fetch("/team.json")
    const members = await response.json()

    return {members}
  }
</script>

<script>
  export let members
</script>

<h1>Team</h1>

<ul>
  {#each members as member}
    <li>
      <a rel=prefetch href={`/team/${member.id}`}>{member.name} ({member.company})</a>
    </li>
  {/each}
</ul>
      <a href='/team/fakey-mc-fakeface'>Fakey McFakeFace</a>
