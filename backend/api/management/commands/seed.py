"""Seed the DB with demo users, categories, skills."""
import random

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from api.models import Category, Skill

User = get_user_model()

CATEGORIES = [
    ('Languages', 'languages'),
    ('Music', 'music'),
    ('Programming', 'programming'),
    ('Design', 'design'),
    ('Cooking', 'cooking'),
    ('Fitness', 'fitness'),
]

USERS = [
    ('rakhat',    'Rakhat',    'Zhenisbek',  '#E8B4A0'),
    ('nurgisa',   'Nurgisa',   'Makhan',     '#A8C4B0'),
    ('erkebulan', 'Erkebulan', 'Razbek',     '#D4A6C4'),
    ('madiyar',   'Madiyar',   'Duisenbay',  '#C4B896'),
    ('aiym',      'Aiym',      'Abdamenova', '#B8A8D4'),
]

SKILLS = [
    ('Conversational Japanese', 'Languages', 'offer', 'intermediate',
     'Weekly 1-hour sessions focused on everyday conversation and cultural context.'),
    ('Learn Italian for travel', 'Languages', 'request', 'beginner',
     'Planning a trip to Rome in spring, need basics.'),
    ('Classical piano lessons', 'Music', 'offer', 'advanced',
     'Conservatory-trained, 10+ years teaching experience.'),
    ('Guitar — fingerstyle basics', 'Music', 'offer', 'beginner',
     'From zero to your first song in six weeks.'),
    ('Looking to learn jazz drums', 'Music', 'request', 'intermediate',
     'Can play rock, want to move into swing and bebop.'),
    ('Web development mentoring', 'Programming', 'offer', 'intermediate',
     'Senior engineer. Code review, architecture, best practices.'),
    ('UI & Frontend basics', 'Programming', 'offer', 'advanced',
     'Design systems, state management, performance.'),
    ('Teach me backend development', 'Programming', 'request', 'beginner',
     'Want to learn how servers and APIs work from scratch.'),
    ('Figma for product designers', 'Design', 'offer', 'intermediate',
     'Auto-layout, components, variants. Portfolio review included.'),
    ('Learn brand illustration', 'Design', 'request', 'beginner',
     'Happy to swap for any coding help.'),
    ('Neapolitan pizza — from dough to oven', 'Cooking', 'offer', 'intermediate',
     '48-hour fermentation, stone oven techniques.'),
    ('Indian home cooking fundamentals', 'Cooking', 'offer', 'beginner',
     'Dal, roti, five classic curries. Vegetarian-friendly.'),
    ('Calisthenics for beginners', 'Fitness', 'offer', 'beginner',
     'Progressions for pull-ups, push-ups, core. No equipment.'),
    ('Running coach — 5k to half marathon', 'Fitness', 'offer', 'intermediate',
     '12-week plan, mobility work, race strategy.'),
    ('Learn mobility & stretching routine', 'Fitness', 'request', 'beginner',
     'Desk job stiffness, want a daily routine.'),
]


class Command(BaseCommand):
    help = 'Seed the DB with demo SkillSwap data.'

    def handle(self, *args, **options):
        # Categories
        cats = {}
        for name, slug in CATEGORIES:
            cat, _ = Category.objects.get_or_create(
                slug=slug, defaults={'name': name},
            )
            cats[name] = cat
        self.stdout.write(self.style.SUCCESS(
            f'Categories: {len(cats)}'))

        # Users — wipe non-superusers and recreate
        User.objects.filter(is_superuser=False).delete()
        users = []
        for username, first, last, color in USERS:
            user = User.objects.create(
                username=username,
                first_name=first,
                last_name=last,
                avatar_color=color,
                bio=f'Hi, I am {first}. Happy to swap skills!',
            )
            user.set_password('password123')
            user.save()
            users.append(user)
        self.stdout.write(self.style.SUCCESS(
            f'Users: {len(users)} (password: password123)'))

        # Skills
        Skill.objects.all().delete()
        count = 0
        for title, cat_name, kind, level, desc in SKILLS:
            Skill.objects.create(
                owner=random.choice(users),
                category=cats[cat_name],
                title=title,
                kind=kind,
                level=level,
                description=desc,
                is_remote=random.choice([True, True, False]),
            )
            count += 1
        self.stdout.write(self.style.SUCCESS(f'Skills: {count}'))
        self.stdout.write(self.style.SUCCESS('\nDone. Log in as any user'
                                             ' with password: password123'))
