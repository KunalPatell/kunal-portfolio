from huggingface_hub import HfApi

def manage():
    api = HfApi()
    
    portfolio_repo = "Kunalptl777/kunal-portfolio"
    mask_repo = "Kunalptl777/mask-detection"
    
    print(f"Pausing Space: {portfolio_repo}...")
    try:
        api.pause_space(repo_id=portfolio_repo)
        print(f"SUCCESS: Paused {portfolio_repo}")
    except Exception as e:
        print(f"ERROR pausing {portfolio_repo}: {e}")
        
    print(f"Restarting Space: {mask_repo}...")
    try:
        api.restart_space(repo_id=mask_repo)
        print(f"SUCCESS: Restarted {mask_repo}")
    except Exception as e:
        print(f"ERROR restarting {mask_repo}: {e}")

if __name__ == "__main__":
    manage()
