#!/usr/bin/env ruby

require "yaml"

ROOT = File.expand_path("..", __dir__)
COMPONENTS_PATH = File.join(ROOT, "_data", "components.yml")
NAVIGATION_PATH = File.join(ROOT, "_data", "navigation.yml")
DRY_RUN = ARGV.include?("--dry-run")

def ask_yes_no(label, current)
  prompt = current ? "Y/n" : "y/N"
  print "  #{label} [#{prompt}] "
  answer = $stdin.gets&.strip&.downcase
  return current if answer.nil? || answer.empty?
  return true if %w[y yes].include?(answer)
  return false if %w[n no].include?(answer)

  puts "    Please answer y or n. Keeping the current value."
  current
end

def ask_group(data, group, title, questions)
  puts "\n#{title}"
  data[group] ||= {}
  questions.each do |key, label|
    current = data[group].fetch(key, false)
    data[group][key] = ask_yes_no(label, current)
  end
end

components = YAML.safe_load(File.read(COMPONENTS_PATH), aliases: true)
navigation = YAML.safe_load(File.read(NAVIGATION_PATH), aliases: true)

puts "Scholar in Motion - component setup"
puts "Press Enter to keep the current answer."

ask_group(components, "home", "Homepage", {
  "proof_points" => "Show the floating topic labels?",
  "current_initiative" => "Show a current initiative or collaboration?",
  "guiding_question" => "Show a guiding question before the research map?",
  "research_map" => "Show the research map on the homepage?",
  "methods" => "Show an evidence and methods section?",
  "news" => "Show News & Activity?",
  "beyond_cv" => "Show the Beyond the CV photo wall?"
})

ask_group(components, "research", "Research page", {
  "map" => "Show the full research map?",
  "strand_stories" => "Show narrative sections for each research strand?",
  "methods" => "Repeat the evidence and methods section here?"
})

ask_group(components, "publications", "Publications page", {
  "featured" => "Show one featured publication?",
  "peer_reviewed" => "Show peer-reviewed journal articles?",
  "proceedings" => "Show conference proceedings?",
  "books" => "Show books and chapters?",
  "in_progress" => "Show selected work in progress?"
})

ask_group(components, "teaching", "Teaching page", {
  "overview" => "Show the teaching overview?",
  "featured" => "Show a featured teaching context?",
  "additional_contexts" => "Show additional teaching contexts?",
  "mentoring" => "Show a mentoring section?",
  "evidence_gallery" => "Show a teaching evidence gallery?"
})

ask_group(components, "service", "Service page", {
  "overview" => "Show the service overview?",
  "featured" => "Show featured professional service?",
  "leadership" => "Show leadership and community work?",
  "review" => "Show scholarly review service?"
})

ask_group(components, "design", "Design & Development page", {
  "overview" => "Show the design overview?",
  "featured" => "Show a featured project?",
  "additional_projects" => "Show additional projects?",
  "evaluation" => "Show evaluation and improvement work?"
})

puts "\nNavigation"
navigation.fetch("main", []).each do |item|
  current = item.fetch("enabled", true)
  item["enabled"] = ask_yes_no("Show #{item.fetch('title')} in the main navigation?", current)
end

if DRY_RUN
  puts "\nDry run: no files were changed."
  puts "\n--- _data/components.yml ---"
  puts YAML.dump(components)
  puts "--- _data/navigation.yml ---"
  puts YAML.dump(navigation)
  exit
end

File.write(
  COMPONENTS_PATH,
  "# Set any value to false when that component does not fit your portfolio.\n" +
    YAML.dump(components).sub(/\A---\s*\n/, "")
)
File.write(NAVIGATION_PATH, YAML.dump(navigation).sub(/\A---\s*\n/, ""))

puts "\nUpdated:"
puts "  #{COMPONENTS_PATH}"
puts "  #{NAVIGATION_PATH}"
puts "\nRun `bundle exec jekyll serve` to review the result."
