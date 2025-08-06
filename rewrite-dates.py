from datetime import datetime, timedelta

start_date = datetime(2025, 5, 1, 12, 0, 0)  # First changed commit date

def commit_callback(commit, counter={"i": 0, "first": True}):
    if counter["first"]:
        # Keep initial commit date unchanged
        counter["first"] = False
        return
    new_date = start_date + timedelta(days=counter["i"])
    date_str = new_date.strftime("%Y-%m-%d %H:%M:%S +0000").encode()
    commit.author_date = date_str
    commit.committer_date = date_str
    counter["i"] += 1
