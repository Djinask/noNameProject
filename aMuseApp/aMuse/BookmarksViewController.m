//
//  BookmarksViewController.m
//  aMuse
//
//  Created by simone on 09/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import "BookmarksViewController.h"
#import "HudView.h"

@interface BookmarksViewController ()
{    NSURLRequest *urlrequest;
    UIActivityIndicatorView *spinner;
    BOOL tryingToConnect;
    ZBarReaderViewController *scanner;
    BOOL uploadSuccess;

}

@end

@implementation BookmarksViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
    spinner.frame = CGRectMake(0.0, 0.0, 40.0, 40.0);
    spinner.hidesWhenStopped = YES;
    spinner.center = self.view.center;
    spinner.color = [UIColor colorWithWhite:0.0 alpha:1.0];
    [self.view addSubview:spinner];
    
    //inizializzo scanner
    scanner = [ZBarReaderViewController new];
    scanner.readerDelegate = self;
    scanner.supportedOrientationsMask = ZBarOrientationMaskAll;
    
    [scanner.scanner setSymbology: 0
                        config: ZBAR_CFG_ENABLE
                            to: 0];
    [scanner.scanner setSymbology: ZBAR_QRCODE
                        config: ZBAR_CFG_ENABLE
                            to: 1];

    
    self.webView.delegate = self;
    
    NSURL *url = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileviews/bookmarks"];
    urlrequest = [[NSURLRequest alloc] initWithURL:url];
	[NSURLConnection connectionWithRequest:urlrequest delegate:nil];
    [self.webView loadRequest:urlrequest];
    
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)aggiungiQR{
    [self presentViewController:scanner animated:YES completion:nil];
}




-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    id<NSFastEnumeration> results = [info objectForKey:ZBarReaderControllerResults];
    ZBarSymbol *symbol = nil;
    for(symbol in results)
        break;
    NSLog(@"Sono qui");
    [self addBookmarkViaQR:symbol.data];
    NSLog(@"Provatoo");
    [self dismissModalViewControllerAnimated:YES];
    NSLog(@"Fatto il dismiss");
}

- (void)addBookmarkViaQR:(NSString*)identifier{
    NSLog(@"Entrato in add bookmark");
   // NSLog(identifier);
    NSURL *qrurl = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileapi/addobject"];
    ASIFormDataRequest *request = [ASIFormDataRequest requestWithURL:qrurl];
    [request setRequestMethod:@"POST"];
    [request setPostValue:[[NSUserDefaults standardUserDefaults] valueForKey:@"ID"] forKey:@"id"];
    [request setPostValue:[[NSUserDefaults standardUserDefaults] valueForKey:@"password"] forKey:@"password"];
    [request setPostValue:identifier forKey:@"object"]; //id dell oggetto da aggiungere
    [request setDelegate:self];
    [request startAsynchronous];
}


-(void)requestFinished:(ASIHTTPRequest *)request{
    //NSLog([request responseString]);
    UIImage *imageToUse;
    NSString *stringToUse;
    if([request.responseString isEqualToString:@"success"]){
        NSLog(@"Entrato QR");
        imageToUse = [UIImage imageNamed:@"success.png"];
        stringToUse = @"Opera aggiunta";
        uploadSuccess = YES;
    } else{
        imageToUse = [UIImage imageNamed:@"error.png"];
        if([request.responseString isEqualToString:@"alreadyused"]){
            stringToUse = @"Opera in lista";
        } else{
            stringToUse = @"Errore";
        }
    }
    NSLog(@"fatto");
    HudView *hudView = [HudView hudInView:self.navigationController.view animated:YES disappear:NO withImage:imageToUse];
    hudView.text = stringToUse;
    hudView.tag = 100;
    [self performSelector:@selector(removeInfoHud) withObject:nil afterDelay:1.3];
    if(uploadSuccess){
        [self.webView reload];
        uploadSuccess = NO;
    }
    NSLog(@"Processo concluso");
}

-(void)removeInfoHud{
    UIView * subview = nil;
    for (subview in [self.navigationController.view subviews]){
        if (subview.tag == 100) {
            [subview removeFromSuperview];
            self.navigationController.view.userInteractionEnabled = YES;
        }
    }
    
}


-(void)webViewDidFinishLoad:(UIWebView *)webView{
    [spinner stopAnimating];
    NSURL *newURL = webView.request.URL;
    NSURL *correct = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileviews/bookmarks"];
    if(![newURL isEqual:correct]){
        NSLog(@"UrL non è corretto");
        [self tryLogin];
        [webView loadRequest:urlrequest];
    }
}
-(IBAction)reload{
    [self.webView reload];
    [spinner startAnimating];
}


-(void)webViewDidStartLoad:(UIWebView *)webView{
    [spinner startAnimating];
}

-(void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error{
    NSLog(@"Connection error");
    UIAlertView *errore = [[UIAlertView alloc] initWithTitle:@"Errore di Connessione" message:@"Impossibile caricare la pagina. Sicuro di essere connesso?" delegate:nil cancelButtonTitle:@"Ok" otherButtonTitles: nil];
    [errore show];
    [spinner stopAnimating];
}


- (void)tryLogin{
    NSString *email = [[NSUserDefaults standardUserDefaults] valueForKey:@"email"];
    NSString *password = [[NSUserDefaults standardUserDefaults] valueForKey:@"password"];
    if (email != nil && password != nil){
        NSURL *url = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileapi/login"];
        ASIFormDataRequest *request = [ASIFormDataRequest requestWithURL:url];
        [request setRequestMethod:@"POST"];
        [request setPostValue:email forKey:@"email"];
        [request setPostValue:password forKey:@"password"];
        [request setPostValue:@"submit" forKey:@"post"];
        [request setDelegate:self];
        [request startAsynchronous];
    }else{
        NSLog(@"Impossibile");
    }
}

@end
