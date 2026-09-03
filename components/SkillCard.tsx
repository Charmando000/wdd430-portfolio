interface SkillCardProps {
  skill: string;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        {skill}
      </h3>
    </div>
  );
}