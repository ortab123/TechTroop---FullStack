export default function Company({ companyName, revenue }) {
  return (
    <div id={companyName}>
      {companyName} make ${revenue} billion every year
    </div>
  );
}
